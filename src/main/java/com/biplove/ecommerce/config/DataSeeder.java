package com.biplove.ecommerce.config;

import com.biplove.ecommerce.models.Product;
import com.biplove.ecommerce.models.Role;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.models.enums.CustomerRankStatus;
import com.biplove.ecommerce.models.enums.SellerRankStatus;
import com.biplove.ecommerce.repository.ProductRepository;
import com.biplove.ecommerce.repository.RoleRepository;
import com.biplove.ecommerce.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

//@Component
//public class DataSeeder implements CommandLineRunner {
//
//  private final UserRepository userRepository;
//  private final ProductRepository productRepository;
//  private final RoleRepository roleRepository;
//  private final Random random = new Random();
//
//  // Role objects to be created and reused
//  private Role customerRole;
//  private Role sellerRole;
//
//  public DataSeeder(UserRepository userRepository, ProductRepository productRepository, RoleRepository roleRepository) {
//    this.userRepository = userRepository;
//    this.productRepository = productRepository;
//    this.roleRepository = roleRepository;
//  }
//
//  @Override
//  @Transactional
//  public void run(String... args) throws Exception {
//    // Run only if the database is empty (no existing users)
//    if (userRepository.count() > 0) {
//      System.out.println("Data seeding skipped. Users already exist.");
//      return;
//    }
//
//    System.out.println("Starting data seeding...");
//
//    // 0. Initialize Roles first
//    initializeRoles();
//
//    // 1. Create 10 Sellers
//    List<UserEntity> sellers = createSellers(10);
//    userRepository.saveAll(sellers);
//    System.out.println("Created " + sellers.size() + " Seller accounts.");
//
//    // 2. Create 25 Customers
//    List<UserEntity> customers = createCustomers(25);
//    userRepository.saveAll(customers);
//    System.out.println("Created " + customers.size() + " Customer accounts.");
//
//    // 3. Create 50 Products
//    List<Product> products = createProducts(50, sellers);
//    productRepository.saveAll(products);
//    System.out.println("Created " + products.size() + " Products.");
//
//    System.out.println("Data seeding complete.");
//  }
//
//  private void initializeRoles() {
//    // Find or create the Customer role
//    customerRole = roleRepository.findByName("CUSTOMER").orElseGet(() -> {
//      // FIX: Use default constructor and setter, as Role no longer has a String constructor
//      Role role = new Role();
//      role.setName("CUSTOMER");
//      return roleRepository.save(role);
//    });
//
//    // Find or create the Seller role
//    sellerRole = roleRepository.findByName("SELLER").orElseGet(() -> {
//      // FIX: Use default constructor and setter
//      Role role = new Role();
//      role.setName("SELLER");
//      return roleRepository.save(role);
//    });
//    System.out.println("Initialized Roles: CUSTOMER and SELLER.");
//  }
//
//  private List<UserEntity> createSellers(int count) {
//    List<UserEntity> sellers = new ArrayList<>();
//    SellerRankStatus[] ranks = SellerRankStatus.values();
//    for (int i = 1; i <= count; i++) {
//      // Generate a sample phone number as Long
//      long phoneNum = 1234560000L + (9000 + i);
//
//      sellers.add(UserEntity.builder()
//          .name("Seller " + i)
//          .email("seller" + i + "@example.com")
//          .address("Shop Address " + i)
//          .phone(phoneNum)
//          .password("{noop}password")
//          .shopName("Shop Name " + i)
//          .sellerRankStatus(ranks[random.nextInt(ranks.length)])
//          // Assign the SELLER role
//          .roles(List.of(sellerRole))
//          .build());
//    }
//    return sellers;
//  }
//
//  private List<UserEntity> createCustomers(int count) {
//    List<UserEntity> customers = new ArrayList<>();
//    CustomerRankStatus[] ranks = CustomerRankStatus.values();
//    for (int i = 1; i <= count; i++) {
//      // Generate a sample phone number as Long
//      long phoneNum = 5551230000L + (1000 + i);
//
//      customers.add(UserEntity.builder()
//          .name("Customer " + i)
//          .email("customer" + i + "@example.com")
//          .address("Customer Address " + i)
//          .phone(phoneNum)
//          .password("{noop}password")
//          // Assign a random Customer Rank
//          .customerRankStatus(ranks[random.nextInt(ranks.length)])
//          // Assign the CUSTOMER role
//          .roles(List.of(customerRole))
//          .build());
//    }
//    return customers;
//  }
//
//  private List<Product> createProducts(int count, List<UserEntity> sellers) {
//    if (sellers.isEmpty()) return List.of();
//
//    List<Product> products = new ArrayList<>();
//    for (int i = 1; i <= count; i++) {
//      UserEntity seller = sellers.get(random.nextInt(sellers.size()));
//
//      long basePrice = 1000L + random.nextInt(9000);
//      long discountedPrice = basePrice - (long)(basePrice * 0.1 * random.nextInt(4));
//
//      Product product = new Product(
//          null,
//          "Product Item " + i,
//          basePrice,
//          random.nextInt(500) + 10,
//          discountedPrice,
//          seller
//      );
//      products.add(product);
//    }
//    return products;
//  }
//}
