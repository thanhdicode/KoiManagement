package com.example.demo.dto.request.orderRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CheckoutRequest {
    String fullname;
    String email;
    String phone;
    String address;
    String cartId;
    List<GuestCartItemRequest> cartItems;
    float total;
    String paymentId;
}


