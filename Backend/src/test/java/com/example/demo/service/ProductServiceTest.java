package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.anyFloat;
import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.demo.dto.request.productRequest.ProductCreateRequest;
import com.example.demo.dto.request.productRequest.ProductUpdateRequest;
import com.example.demo.dto.response.categoryResponse.CategoryResponse;
import com.example.demo.dto.response.productResponse.ProductResponse;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.Category;
import com.example.demo.entity.OrderDetail;
import com.example.demo.entity.Product;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.aot.DisabledInAotMode;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {ProductService.class})
@ExtendWith(SpringExtension.class)
@DisabledInAotMode
class ProductServiceTest {
    @MockBean
    private CategoryRepository categoryRepository;

    @MockBean
    private ProductMapper productMapper;

    @MockBean
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Test
    @DisplayName("Test createProduct - Success Scenario")
    void testCreateProduct_Success() {
        // Arrange
        Category category = new Category();
        category.setCateId(1);
        category.setCateName("Test Category");

        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));
        when(productRepository.save(any(Product.class))).thenReturn(new Product());

        ProductCreateRequest request = ProductCreateRequest.builder()
                .categoryId(1)
                .description("Product description")
                .image("image.jpg")
                .name("Product Name")
                .status(true)
                .stock(5)
                .unitprice(20.0f)
                .build();

        // Act
        Product createdProduct = productService.createProduct(request);

        // Assert
        assertNotNull(createdProduct);
        verify(categoryRepository).findById(1);
        verify(productRepository).save(any(Product.class));
    }



@Test
@DisplayName("Test getProduct - Success Scenario")
void testGetProduct_Success() {
    // Arrange
    Product product = new Product();
    product.setProductId(1);
    product.setProductName("Product Name");
    product.setDescription("Product Description");
    product.setUnitPrice(20.0f);
    product.setStock(10);
    product.setStatus(true);

    Category category = new Category();
    category.setCateId(2);
    category.setCateName("Category Name");
    product.setCategory(category);

    when(productRepository.findById(1)).thenReturn(Optional.of(product));

    // Act
    ProductResponse productResponse = productService.getProduct(1);

    // Assert
    assertNotNull(productResponse, "ProductResponse should not be null");
    assertEquals("Product Name", productResponse.getProductName(), "Product name mismatch");
    assertEquals("Product Description", productResponse.getDescription(), "Product description mismatch");
    assertEquals(20.0f, productResponse.getUnitPrice(), "Product price mismatch");
    assertEquals(10, productResponse.getStock(), "Product stock mismatch");
    assertTrue(productResponse.getStatus(), "Product status mismatch");

    assertNotNull(productResponse.getCategory(), "Category in ProductResponse should not be null");
    assertEquals(2, productResponse.getCategory().getCateId(), "Category ID mismatch");
    assertEquals("Category Name", productResponse.getCategory().getCateName(), "Category name mismatch");

    verify(productRepository).findById(1);
}

    @Test
    @DisplayName("Test getProduct - Product Not Found")
    void testGetProduct_ProductNotFound() {
        // Arrange
        when(productRepository.findById(1)).thenReturn(Optional.empty());

        // Act and Assert
        AppException exception = assertThrows(AppException.class, () -> productService.getProduct(1));
        assertEquals(ErrorCode.PRODUCT_NOT_FOUND, exception.getErrorCode());
        verify(productRepository).findById(1);
    }


    @Test
    @DisplayName("Test updateProduct - Success Scenario")
    void testUpdateProduct_Success() {
        // Arrange
        Product product = new Product();
        product.setProductId(1);

        when(productRepository.findById(1)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductUpdateRequest request = ProductUpdateRequest.builder()
                .description("Updated Description")
                .stock(10)
                .unitprice(25.0f)
                .build();

        // Act
        productService.updateProduct(1, request);

        // Assert
        verify(productRepository).findById(1);
        verify(productRepository).save(any(Product.class));
    }


    @Test
    @DisplayName("Test updateProduct - Product Not Found")
    void testUpdateProduct_ProductNotFound() {
        // Arrange
        when(productRepository.findById(1)).thenReturn(Optional.empty());

        ProductUpdateRequest request = ProductUpdateRequest.builder()
                .description("Updated Description")
                .stock(10)
                .unitprice(25.0f)
                .build();

        // Act and Assert
        AppException exception = assertThrows(AppException.class, () -> productService.updateProduct(1, request));
        assertEquals(ErrorCode.PRODUCT_NOT_FOUND, exception.getErrorCode());
        verify(productRepository).findById(1);
    }


}
