package com.example.be_feeding_data_jobstreet.entity;

import com.google.gson.JsonObject;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "jobs")
public class Job {

    @Id
    private String id;

    @Column(length = 50, nullable = false)
    private String jobTitle;

    @Column(length = 50, nullable = false)
    private String companyName;

    @Column(length = 50, nullable = false)
    private String jobLocation;

    @Column(length = 50, nullable = false)
    private String salary;

    @Column(length = 50, nullable = false)
    private String workType;

    @Column(nullable = false)
    private String shortDesc;

    @ManyToMany
    @JoinTable(name = "job_tags_mapping", joinColumns = @JoinColumn(name = "job_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<JobTag> jobTags;

    private String generateId() {
        return "MNL-" + UUID.randomUUID().toString().split("-")[0];
    }

    @PrePersist
    protected void onCreate() {
        if (this.id == null) {
            this.id = generateId();
        }
    }

    public Job(JsonObject jsonObject) {
        this.id = jsonObject.getAsJsonPrimitive("id").getAsString();
        this.jobTitle = jsonObject.getAsJsonPrimitive("title").getAsString();
        this.companyName = jsonObject.getAsJsonObject("advertiser").getAsJsonPrimitive("description").getAsString();
        this.jobLocation = jsonObject.getAsJsonObject("jobLocation").getAsJsonPrimitive("label").getAsString();
        this.salary = jsonObject.getAsJsonPrimitive("salary").getAsString();
        this.workType = jsonObject.getAsJsonPrimitive("workType").getAsString();
        this.shortDesc = jsonObject.getAsJsonPrimitive("teaser").getAsString();
    }
}
