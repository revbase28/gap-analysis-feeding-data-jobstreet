package com.example.be_feeding_data_jobstreet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BeFeedingDataJobstreetApplication {

    public static void main(String[] args) {
		SpringApplication.run(BeFeedingDataJobstreetApplication.class, args);

//        JsonArray jobs = Tools.scrapeJobData("react");
//        if(jobs != null){
//            List<JobModel> jobArray = jobs.asList().stream().map(jsonElement ->  new JobModel(jsonElement.getAsJsonObject())).collect(Collectors.toList());
//            for (JobModel job: jobArray) {
//                System.out.println(job.getCompanyName());
//            }
//        }
    }

}
