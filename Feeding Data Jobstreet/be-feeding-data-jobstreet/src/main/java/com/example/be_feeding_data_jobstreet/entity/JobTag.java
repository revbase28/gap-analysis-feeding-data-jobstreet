package com.example.be_feeding_data_jobstreet.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "job_tags")
public class JobTag {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tag_id;

    @Column(length = 30, nullable = false)
    private String tag_desc;

    @ManyToMany(mappedBy = "jobTags")
    @JsonIgnore
    private Set<Job> jobs;
}
