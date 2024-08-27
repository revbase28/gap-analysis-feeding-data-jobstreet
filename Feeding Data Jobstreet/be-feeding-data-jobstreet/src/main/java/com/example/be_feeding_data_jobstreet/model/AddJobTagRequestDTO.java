package com.example.be_feeding_data_jobstreet.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddJobTagRequestDTO {

    @NotBlank
    private String tagDesc;
}
