package com.biplove.ecommerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestPhotosPageController {
  
  
  //  This sends the UI for uploading image
  @GetMapping("photos/uploadUi")
  public String loadUploadImagePage(Model model) {
//    model.addAttribute("message", "Data successfully injected from the Spring Controller!");
    
    return "photoUpload";
  }
}
