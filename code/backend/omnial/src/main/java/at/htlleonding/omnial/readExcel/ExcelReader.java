package at.htlleonding.omnial.readExcel;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.EquipmentType;
import at.htlleonding.omnial.model.Tag;
import at.htlleonding.omnial.model.TagType;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * Service responsible for bootstrapping the database with initial data from an Excel file.
 */
@ApplicationScoped
public class ExcelReader {

    @Inject
    EntityManager em;

    /**
     * Triggered automatically when the Quarkus application starts.
     * @param event The startup event context.
     */
    void onStartUp(@Observes StartupEvent event){
        createTags();
        readExcel();
    }

    /**
     * Reads the Excel file 'Geraete_alle.xlsx', parses its sheets,
     * and persists new Equipment entities to the database.
     */
    @Transactional
    public void readExcel(){
        System.out.println("Processing Excel Data Import...");

        try(FileInputStream file = new FileInputStream("data/Geraete_alle.xlsx");
            XSSFWorkbook workbook = new XSSFWorkbook(file)) {

            int worksheetCount = workbook.getNumberOfSheets();
            for(int w = 0; w < worksheetCount; w++){
                XSSFSheet sheet = workbook.getSheetAt(w);

                // Identify column indices based on header names (Case-Insensitive)
                Row headerRow = sheet.getRow(0);
                int columnIndexSet = -1;
                int columnIndexTyp = -1;
                int columnIndexSeriennummer = -1;

                for (Cell cell : headerRow) {
                    String header = cell.getStringCellValue().trim();
                    if ("set".equalsIgnoreCase(header)) {
                        columnIndexSet = cell.getColumnIndex();
                    }
                    if("typ".equalsIgnoreCase(header) || "beschreibung".equalsIgnoreCase(header)){
                        columnIndexTyp = cell.getColumnIndex();
                    }
                    if("seriennummer".equalsIgnoreCase(header)){
                        columnIndexSeriennummer = cell.getColumnIndex();
                    }
                }

                // Basic validation: ensure the file has the required columns
                if (columnIndexSet == -1) throw new RuntimeException("Column 'set' not found");
                if (columnIndexTyp == -1) throw new RuntimeException("Column 'typ/beschreibung' not found");

                DataFormatter formatter = new DataFormatter();

                // Iterate through data rows (skipping header row 0)
                for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                    Row row = sheet.getRow(i);
                    if (row == null) continue;

                    // Extract cell values safely
                    String set = getCellValue(row, columnIndexSet, formatter);
                    String typ = getCellValue(row, columnIndexTyp, formatter);
                    String seriennummer = (columnIndexSeriennummer != -1) ? getCellValue(row, columnIndexSeriennummer, formatter) : "";

                    // If a "set" name exists, create and persist the Equipment entity
                    if(!set.isEmpty()){
                        Equipment eq = new Equipment();
                        eq.setName(set);
                        eq.setTitle(typ);
                        eq.setLabelNumber(seriennummer);
                        eq.setAvailable(1); // Default to available on import
                        eq.setEquipmentType(determineEquipmentType(set));

                        em.persist(eq);
                    }
                }
            }
        } catch (IOException ex) {
            throw new RuntimeException("Failed to read Excel file", ex);
        }
    }

    /**
     * Helper to extract string value from a cell using POI DataFormatter.
     */
    private String getCellValue(Row row, int index, DataFormatter formatter) {
        Cell cell = row.getCell(index);
        return (cell == null) ? "" : formatter.formatCellValue(cell).trim();
    }

    /**
     * Logic to categorize equipment based on the naming prefix of the "set" string.
     * @param set The set name/ID (e.g., "A10", "F20")
     * @return The corresponding EquipmentType enum.
     */
    public EquipmentType determineEquipmentType(String set){
        String str = set.trim();
        if (str.isEmpty()) return null;

        if(str.startsWith("A")){
            return EquipmentType.AUDIO;
        }
        else if(str.matches("^(FZ|S|VZ|SS|VL|VO).*")){
            return EquipmentType.ZUBEHÖR;
        }
        else if(str.matches("^(F|FS|VK|PVS).*")){
            return EquipmentType.KAMERA;
        }

        return null;
    }

    /**
     * Populates the database with default Tags.
     */
    @Transactional
    public void createTags(){
        for (TagType type : List.of(TagType.AUDIO, TagType.VIDEO, TagType.FOTO)) {
            Tag tag = new Tag();
            tag.setType(type);
            em.persist(tag);
        }
    }
}