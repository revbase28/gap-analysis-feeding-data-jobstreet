package com.example.be_feeding_data_jobstreet.tools;

import com.example.be_feeding_data_jobstreet.entity.Job;
import com.example.be_feeding_data_jobstreet.entity.JobTag;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.poi.sl.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class Tools {

    public static JsonArray scrapeJobData(String keyword) throws Exception {
        try {
            String cleanse = keyword.trim().replace(" ", "-");

            String url = "https://id.jobstreet.com/id/" + cleanse + "-jobs";

            HttpClient httpClient = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(url))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            Document doc = Jsoup.parse(response.body());

            Element scriptElement = doc.select("script[data-automation=server-state]").first();

            if (scriptElement != null) {
                String reduxData = scriptElement.html().split(";")[1].split(" = ")[1].trim();
                System.out.println(reduxData);
                JsonObject result = JsonParser.parseString(reduxData).getAsJsonObject();

                return result.getAsJsonObject("results").getAsJsonObject("results").getAsJsonArray("jobs");
            } else {
                throw new Exception("Script tag with data-automation=\"server-state\" not found.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public static ByteArrayInputStream generateExcel(List<Job> jobs) throws IOException {

        try(XSSFWorkbook workbook = new XSSFWorkbook()){
            XSSFSheet sheet = workbook.createSheet("Jobs");

            XSSFRow headerRow = sheet.createRow(0);
            String[] columns = {"Company Name", "Job Location", "Job Title", "Salary", "Work Type", "Short Desc", "Tags"};

            //Create Header
            for(int i = 0; i < columns.length; i++){
                XSSFCell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            //Create rows with data
            int rowIdx = 1;
            for(Job job: jobs){
                XSSFRow row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(job.getCompanyName());
                row.createCell(1).setCellValue(job.getJobLocation());
                row.createCell(2).setCellValue(job.getJobTitle());
                row.createCell(3).setCellValue(job.getSalary());
                row.createCell(4).setCellValue(job.getWorkType());
                row.createCell(5).setCellValue(job.getShortDesc());

                StringBuilder stringBuilder = new StringBuilder();

                Set<JobTag> jobTags = job.getJobTags();
                Iterator<JobTag> iterator = jobTags.iterator();

                while(iterator.hasNext()){
                    stringBuilder.append(iterator.next().getTag_desc());
                    if(iterator.hasNext()){
                        stringBuilder.append(", ");
                    }
                }

                row.createCell(6).setCellValue(stringBuilder.toString());
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate Excel file", e);
        }
    }
}
