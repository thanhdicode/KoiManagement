package com.example.demo.dto.response.userResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String userId;
    String fullname;
    String email;
    String phone;
    String address;
    String role;
    boolean googleAccount;
    boolean status;
}
