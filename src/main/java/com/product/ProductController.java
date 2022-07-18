package com.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductEntity> all() {
        return productService.getAll();
    }

    @PostMapping
    public void store(@RequestBody ProductEntity product) {
        productService.storeNewData(product);
    }

    @PutMapping(path = "{productId}")
    public void update(
        @PathVariable("productId") Long id,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String description,
        @RequestParam(required = false) double price
    ) {
        List<Object> data = List.of(name, description, price);

        productService.updateById(id, data);
    }

    @DeleteMapping(path = "{productId}")
    public void destroy(@PathVariable("productId") Long id) {
        productService.deleteById(id);
    }
}
