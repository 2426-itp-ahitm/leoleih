package at.htl.leonding.leih.features.Boundary;

import at.htl.leonding.leih.features.Model.ExcelUploadForm;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;


import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Path("/excel-to-csv")
public class ExcelToCsvResource {

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.TEXT_PLAIN)
    public Response convertExcelToCsv(@MultipartForm ExcelUploadForm form) {
        try {
            // Read the uploaded Excel file
            InputStream excelFile = new FileInputStream(form.getFile());
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet sheet = workbook.getSheetAt(0); // Assuming the data is in the first sheet

            // Define the columns to extract
            List<String> headers = List.of("Set", "Typ", "Serien-Nr", "Anlagen-Nr", "Anmerkungen");

            // Prepare the CSV file
            String csvFilePath = "output.csv";
            FileWriter out = new FileWriter(csvFilePath);
            CSVPrinter csvPrinter = new CSVPrinter(out, CSVFormat.DEFAULT.withHeader(headers.toArray(new String[0])));

            // Iterate through the Excel rows and write to CSV
            for (Row row : sheet) {
                List<String> rowData = new ArrayList<>();
                for (int i = 0; i < headers.size(); i++) {
                    Cell cell = row.getCell(i, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
                    if (cell == null || cell.getCellType() == CellType.BLANK) {

                    } else {
                        rowData.add(cell.toString());
                    }
                }
                csvPrinter.printRecord(rowData);
            }

            // Close resources
            csvPrinter.close();
            workbook.close();
            excelFile.close();

            // Return the CSV file as a response
            byte[] csvBytes = Files.readAllBytes(Paths.get(csvFilePath));
            return Response.ok(csvBytes)
                    .header("Content-Disposition", "attachment; filename=\"output.csv\"")
                    .build();

        } catch (IOException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error processing the file: " + e.getMessage())
                    .build();
        }
    }
}

