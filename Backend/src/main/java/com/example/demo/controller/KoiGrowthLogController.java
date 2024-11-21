package com.example.demo.controller;

import com.example.demo.dto.request.koiRequest.KoiGrowthLogCreateRequest;
import com.example.demo.dto.response.ApiResponse;
import com.example.demo.entity.KoiGrowthLog;
import com.example.demo.service.KoiGrowthLogService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/koi-growth-log")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KoiGrowthLogController {

    KoiGrowthLogService koiGrowthLogService;

    @PostMapping("/create")
    ResponseEntity<ApiResponse<KoiGrowthLog>> createKoiGrowthLog(@RequestBody KoiGrowthLogCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<KoiGrowthLog>builder()
                        .message("Create Koi's log successfully")
                        .result(koiGrowthLogService.createKoiGrowthLog(request))
                        .build());
    }

    @DeleteMapping("/{koiLogId}")
    ResponseEntity<Void> deleteKoiGrowthLog(@PathVariable String koiLogId) {
        koiGrowthLogService.deleteKoiGrowthLog(koiLogId);
        return ResponseEntity.noContent().build();
    }
}
