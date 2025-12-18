package at.htlleonding.omnial.readExcel;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.EquipmentType;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@ApplicationScoped
public class ExcelReader {
    @Inject
    EntityManager em;

    void onStartUp(@Observes StartupEvent event){
        readCameras();
    }
    @Transactional
    public void readCameras() {
        try (FileInputStream file = new FileInputStream("data/Geraete_alle.xlsx");
             XSSFWorkbook workbook = new XSSFWorkbook(file)) {

            XSSFSheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                List<Object> values = new ArrayList<>();

                for (int i = 0; i < 3; i++) {
                    Cell cell = row.getCell(i);

                    if (cell == null) {
                        values.add(null);
                        continue;
                    }

                    switch (cell.getCellType()) {
                        case STRING:
                            values.add(cell.getStringCellValue());
                            break;
                        case NUMERIC:
                            values.add(cell.getNumericCellValue());
                            break;
                        case BOOLEAN:
                            values.add(cell.getBooleanCellValue());
                            break;
                        default:
                            values.add(null);
                    }
                }
                if (values.get(0) != null && !values.get(0).toString().equals("Set")) {
                    System.out.println(values.get(0));
                    System.out.println(values.get(1));
                    Equipment equipment = new Equipment();
                    equipment.setName(values.get(0).toString());
                    equipment.setTitle(values.get(1).toString());
                    equipment.setLabelNumber(values.get(2).toString());
                    equipment.setAvailable(1);
                    equipment.setEquipmentType(EquipmentType.KAMERA);
                    em.persist(equipment);
                }
            }

        } catch (FileNotFoundException ex) {
            throw new RuntimeException(ex);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

            @Transactional
            public void readExcel() {
                try (FileInputStream file = new FileInputStream("data/Geraete_alle.xlsx");
                     XSSFWorkbook workbook = new XSSFWorkbook(file)) {

                    XSSFSheet sheet = workbook.getSheetAt(0);

                    Iterator<Row> rowIterator = sheet.iterator();
                    if (!rowIterator.hasNext()) {
                        return;
                    }

                    Row headerRow = rowIterator.next();
                    int colSet = -1;
                    int colTyp = -1;
                    int colSeriennummer = -1;

                    for (Cell cell : headerRow) {
                        String header = cell.getStringCellValue().trim().toLowerCase();
                        switch (header) {
                            case "set":
                                colSet = cell.getColumnIndex();
                                break;
                            case "typ":
                                colTyp = cell.getColumnIndex();
                                break;
                            case "seriennummer":
                                colSeriennummer = cell.getColumnIndex();
                                break;
                        }
                    }

                    if (colSet == -1 || colTyp == -1 || colSeriennummer == -1) {
                        throw new RuntimeException("Missing one or more required columns: Set / Typ / Seriennummer");
                    }

                    while (rowIterator.hasNext()) {
                        Row row = rowIterator.next();

                        String setValue = getCellString(row.getCell(colSet));
                        String typValue = getCellString(row.getCell(colTyp));
                        String seriennummerValue = getCellString(row.getCell(colSeriennummer));

                        if (setValue == null || setValue.equalsIgnoreCase("set"))
                            continue;

                        Equipment equipment = new Equipment();
                        equipment.setName(setValue);
                        equipment.setTitle(typValue);
                        equipment.setLabelNumber(seriennummerValue);
                        equipment.setAvailable(1);
                        equipment.setEquipmentType(EquipmentType.KAMERA);

                        em.persist(equipment);
                    }

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            private String getCellString(Cell cell) {
                if (cell == null) return null;
                return switch (cell.getCellType()) {
                    case STRING -> cell.getStringCellValue();
                    case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
                    case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
                    default -> null;
                };
            }
        }

