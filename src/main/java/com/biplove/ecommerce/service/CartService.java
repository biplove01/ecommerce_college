package com.biplove.ecommerce.service;

import com.biplove.ecommerce.DTOs.CartDTO;
import com.biplove.ecommerce.DTOs.CartProductDTO;
import com.biplove.ecommerce.models.Cart;
import com.biplove.ecommerce.models.CartProduct;
import com.biplove.ecommerce.models.Product;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.repository.CartProductRepository;
import com.biplove.ecommerce.repository.CartRepository;
import com.biplove.ecommerce.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
  
  private final CartRepository cartRepository;
  private final CartProductRepository cartProductRepository;
  private final ProductRepository productRepository;
  
  @Autowired
  public CartService(CartRepository cartRepository, CartProductRepository cartProductRepository, ProductRepository productRepository) {
    this.cartRepository = cartRepository;
    this.cartProductRepository = cartProductRepository;
    this.productRepository = productRepository;
  }
  
  @Transactional
  public void addProductToCart(UserEntity userEntity, Long productId, int quantity){
    Cart cart = cartRepository.findByUserEntity(userEntity).orElseGet(() -> {
      Cart newCart = new Cart();
      newCart.setUserEntity(userEntity);
      return cartRepository.save(newCart);
    });
    
    Product product = productRepository.findById(productId).orElseThrow(()-> new RuntimeException("No such product exists with id " + productId ));
    
    cartProductRepository.findByCartAndProduct(cart, product)
        .ifPresentOrElse(
            item -> item.setQuantity(item.getQuantity() + quantity),
            
            () -> {
              CartProduct cartProduct1 = new CartProduct();
              cartProduct1.setCart(cart);
              cartProduct1.setProduct(product);
              cartProduct1.setQuantity(quantity);
              cartProductRepository.save(cartProduct1);
            });
    
  }
  
  @Transactional
  public void removeProductFromCart (UserEntity userEntity, Long cartProductId){
    Cart cart = cartRepository.findByUserEntity(userEntity).orElseThrow(() -> new RuntimeException("The cart is not found"));
    
    CartProduct cartProduct = cartProductRepository.findById(cartProductId).orElseThrow(()-> new RuntimeException("The Cart product is not found"));
    
    if(!cartProduct.getCart().getId().equals(cart.getId())){
      throw new RuntimeException("The cart product does not belong to the user's cart");
    }
    cartProductRepository.delete(cartProduct);
  }
  
  public List<CartProduct> getAllCartProducts(UserEntity userEntity){
    return this.cartRepository.findByUserEntity(userEntity).map(Cart::getCartProducts).orElse(Collections.emptyList());
  }
  
  @Transactional
  public CartDTO getCartDTO(UserEntity user) {
    return cartRepository.findByUserEntity(user)
        .map(this::convertToDto)
        .orElse(new CartDTO());
  }
  
  private CartDTO convertToDto(Cart cart) {
    CartDTO cartDTO = new CartDTO();
    cartDTO.setCartId(cart.getId());
    List<CartProductDTO> itemDTOs = cart.getCartProducts().stream()
        .map(this::convertToItemDto)
        .collect(Collectors.toList());
    cartDTO.setItems(itemDTOs);
    return cartDTO;
  }
  
  private CartProductDTO convertToItemDto(CartProduct item) {
    CartProductDTO itemDTO = new CartProductDTO();
    itemDTO.setCartProductId(item.getId());
    itemDTO.setProductId(item.getProduct().getId());
    itemDTO.setProductName(item.getProduct().getName());
    itemDTO.setProductPrice(item.getProduct().getPrice());
    itemDTO.setQuantity(item.getQuantity());
    itemDTO.setImages(item.getProduct().getImages());
    return itemDTO;
  }
}
