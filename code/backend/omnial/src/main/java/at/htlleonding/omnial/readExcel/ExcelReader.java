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

@ApplicationScoped
public class ExcelReader {
    @Inject
    EntityManager em;

    void onStartUp(@Observes StartupEvent event){
        createTags();
        //readExcel(); for prod, fix later TODO
    }

    @Transactional
    public void readExcel(){
        System.out.println("readExcel");
        try(FileInputStream file = new FileInputStream("data/Geraete_alle.xlsx");
            XSSFWorkbook workbook = new XSSFWorkbook(file)) {

            int worksheetCount = workbook.getNumberOfSheets();
            for(int w = 0; w < worksheetCount; w++){
                XSSFSheet sheet = workbook.getSheetAt(w);
                Row headerRow = sheet.getRow(0);
                int columnIndexSet = -1;
                int columnIndexTyp = -1;
                int columnIndexSeriennummer = -1;

                for (Cell cell : headerRow) {
                    if ("set".equalsIgnoreCase(cell.getStringCellValue().trim())) {
                        columnIndexSet = cell.getColumnIndex();
                    }
                    if("typ".equalsIgnoreCase(cell.getStringCellValue().trim())){
                        columnIndexTyp = cell.getColumnIndex();
                    }
                    else if("beschreibung".equalsIgnoreCase(cell.getStringCellValue().trim())){
                        columnIndexTyp = cell.getColumnIndex();
                    }
                    if("seriennummer".equalsIgnoreCase(cell.getStringCellValue().trim())){
                        columnIndexSeriennummer = cell.getColumnIndex();
                    }
                }
                if (columnIndexSet == -1) {
                    throw new RuntimeException("Column 'set' not found");
                }
                if(columnIndexTyp == -1){
                    throw new RuntimeException("Column 'typ' or 'beschreibung' not found");
                }
                DataFormatter formatter = new DataFormatter();

                for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                    String set = "";
                    String typ = "";
                    String seriennummer="";
                    Row row = sheet.getRow(i);
                    if (row == null) continue;

                    Cell setCell = row.getCell(columnIndexSet);
                    if (setCell == null) continue;

                    if(!formatter.formatCellValue(setCell).isEmpty()){
                        set = formatter.formatCellValue(setCell);
                    }

                    Cell typCell = row.getCell(columnIndexTyp);
                    if (typCell == null) continue;

                    if(!formatter.formatCellValue(typCell).isEmpty()){
                        typ = formatter.formatCellValue(typCell);
                    }
                    if(columnIndexSeriennummer != -1){
                        Cell seriennummerCell = row.getCell(columnIndexSeriennummer);
                        if (seriennummerCell == null) continue;

                        if(!formatter.formatCellValue(seriennummerCell).isEmpty()){
                            seriennummer = formatter.formatCellValue(seriennummerCell);
                        }
                    }
                    if(!set.isEmpty()&&!set.isBlank()){
                        Equipment eq = new Equipment();
                        eq.setName(set);
                        eq.setTitle(typ);
                        eq.setLabelNumber(seriennummer);
                        eq.setAvailable(1);
                        eq.setEquipmentType(setEquipmentType(set));
                        //System.out.printf("%s %s\n",eq.getName(),eq.getEquipmentType().toString());
                        em.persist(eq);
                    }
                }
            }
        }catch (FileNotFoundException ex) {
            throw new RuntimeException(ex);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
    public EquipmentType setEquipmentType(String set){
        String str = set.trim();
        EquipmentType type = null;
        if (str == null || str.isEmpty()) {

        }
        else if(str.startsWith("A")){
            type = EquipmentType.AUDIO;
        }
        else if(str.startsWith("FZ")||str.startsWith("S")||str.startsWith("VZ")||str.startsWith("SS")||str.startsWith("VL")||str.startsWith("VO")){
            type = EquipmentType.ZUBEHÖR;

        }
        else if(str.startsWith("F")||str.startsWith("FS")||str.startsWith("VK")||str.startsWith("PVS")){
            type = EquipmentType.KAMERA;
        }
        else{
            type = null;
        }
        return type;
    }
    @Transactional
    public void createTags(){
        Tag audioTag = new Tag();
        audioTag.setType(TagType.AUDIO);
        Tag videoTag = new Tag();
        videoTag.setType(TagType.VIDEO);
        Tag fotoTag = new Tag();
        fotoTag.setType(TagType.FOTO);
        em.persist(audioTag);
        em.persist(videoTag);
        em.persist(fotoTag);
    }
}



