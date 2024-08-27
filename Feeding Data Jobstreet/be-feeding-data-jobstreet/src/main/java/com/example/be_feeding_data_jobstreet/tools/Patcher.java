package com.example.be_feeding_data_jobstreet.tools;

import com.example.be_feeding_data_jobstreet.entity.Job;

import java.lang.reflect.Field;

public class Patcher {
    public static void jobPatcher(Job existing, Job incomplete) throws IllegalAccessException {
        //GET THE COMPILED VERSION OF THE CLASS
        Class<?> internClass= Job.class;
        Field[] internFields=internClass.getDeclaredFields();
        System.out.println(internFields.length);
        for(Field field : internFields){
            if(field.getName().equals("id")){
                continue;
            }

            System.out.println(field.getName());
            //CANT ACCESS IF THE FIELD IS PRIVATE
            field.setAccessible(true);

            //CHECK IF THE VALUE OF THE FIELD IS NOT NULL, IF NOT UPDATE EXISTING INTERN
            Object value=field.get(incomplete);
            if(value!=null){
                field.set(existing,value);
            }
            //MAKE THE FIELD PRIVATE AGAIN
            field.setAccessible(false);
        }
    }
}
