package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.*;

import com.example.demo.dto.request.koiRequest.KoiCreateRequest;
import com.example.demo.dto.request.koiRequest.KoiUpdateRequest;
import com.example.demo.entity.Koi;
import com.example.demo.entity.Pond;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.KoiMapper;
import com.example.demo.repository.KoiRepository;
import com.example.demo.repository.PondRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

@ExtendWith(SpringExtension.class)
class KoiServiceTest {

    @Mock
    private KoiMapper koiMapper;

    @Mock
    private KoiRepository koiRepository;

    @Mock
    private PondRepository pondRepository;

    @InjectMocks
    private KoiService koiService;

    // Positive Case: Test createKoi with valid data
    @Test
    @DisplayName("Create Koi - Success")
    void testCreateKoi_Success() {
        KoiCreateRequest request = new KoiCreateRequest();
        Pond pond = new Pond();
        Koi koi = new Koi();

        when(pondRepository.findById(anyInt())).thenReturn(Optional.of(pond));
        when(koiRepository.save(isA(Koi.class))).thenReturn(koi);

        Koi result = koiService.createKoi(request);

        verify(koiRepository).save(isA(Koi.class));
        assertSame(koi, result, "Koi should be created successfully");
    }

    // Negative Case: Test createKoi with non-existent pond (error handling)
    @Test
    @DisplayName("Create Koi - Pond Not Found")
    void testCreateKoi_PondNotFound() {
        KoiCreateRequest request = new KoiCreateRequest();

        when(pondRepository.findById(anyInt())).thenReturn(Optional.empty());

        AppException exception = assertThrows(AppException.class, () -> koiService.createKoi(request));
        assertSame(ErrorCode.POND_NOT_FOUND, exception.getErrorCode(), "Should throw error if pond is missing");
    }

    // Positive Case: Test getKoi with valid ID
    @Test
    @DisplayName("Get Koi - Success")
    void testGetKoi_Success() {
        Koi koi = new Koi();
        when(koiRepository.findById(anyInt())).thenReturn(Optional.of(koi));

        Koi result = koiService.getKoi(1);

        verify(koiRepository).findById(eq(1));
        assertSame(koi, result, "Should retrieve Koi successfully");
    }



    // Positive Case: Test updateKoi with valid data
    @Test
    @DisplayName("Update Koi - Success")
    void testUpdateKoi_Success() {
        KoiUpdateRequest request = new KoiUpdateRequest();
        Koi koi = new Koi();

        when(koiRepository.findById(anyInt())).thenReturn(Optional.of(koi));
        when(koiRepository.save(isA(Koi.class))).thenReturn(koi);

        Koi result = koiService.updateKoi(1, request);

        verify(koiMapper).updateKoi(isA(Koi.class), eq(request));
        verify(koiRepository).save(koi);
        assertSame(koi, result, "Koi should be updated successfully");
    }

    // Negative Case: Test updateKoi with invalid ID
    @Test
    @DisplayName("Update Koi - Not Found")
    void testUpdateKoi_NotFound() {
        KoiUpdateRequest request = new KoiUpdateRequest();

        when(koiRepository.findById(anyInt())).thenReturn(Optional.empty());

        AppException exception = assertThrows(AppException.class, () -> koiService.updateKoi(1, request));
        assertSame(ErrorCode.KOI_NOT_FOUND, exception.getErrorCode(), "Should throw error if Koi is missing");
    }

    // Positive Case: Test deleteKoi with valid ID
    @Test
    @DisplayName("Delete Koi - Success")
    void testDeleteKoi_Success() {
        when(koiRepository.existsById(anyInt())).thenReturn(true);
        doNothing().when(koiRepository).deleteById(anyInt());

        koiService.deleteKoi(1);

        verify(koiRepository).deleteById(eq(1));
    }

    // Negative Case: Test deleteKoi with invalid ID
    @Test
    @DisplayName("Delete Koi - Not Found")
    void testDeleteKoi_NotFound() {
        when(koiRepository.existsById(anyInt())).thenReturn(false);

        AppException exception = assertThrows(AppException.class, () -> koiService.deleteKoi(1));
        assertSame(ErrorCode.KOI_NOT_FOUND, exception.getErrorCode(), "Should throw error if Koi is missing");
    }
}
