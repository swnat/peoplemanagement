package com.swnat.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.ApiOperation;

import com.swnat.dto.PaginationResponse;
import com.swnat.dto.RecordWFDTO;
import com.swnat.service.RecordService;
import org.flowable.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping ("/api/v1/record")
public class RecordController {

    @Autowired
    private RecordService recordService;

    @ApiOperation(value = "Get list record all candidates  ", notes = "Get list of active process and returning paginated.")
    @GetMapping("/")
    public PaginationResponse<RecordWFDTO> getAllRecord(@RequestParam("page") int page, @RequestParam("size") int size) {
        return recordService.find(page, size);
    }
}