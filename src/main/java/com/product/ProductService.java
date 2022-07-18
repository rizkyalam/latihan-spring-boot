package com.product;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductEntity> getAll() {
        return productRepository.findAll();
    }

    public void storeNewData(ProductEntity product) {
        Optional<ProductEntity> productOptional = productRepository
            .findByName(product.getName());

        if (productOptional.isPresent()) {
            throw new IllegalStateException("product name has been taken!");
        }
        
        productRepository.save(product);
    }

    @Transactional
    public void updateById(Long id, List<Object> data) {
        ProductEntity productEntity = productRepository.findById(id)
            .orElseThrow(() -> new IllegalStateException(
                "product with id: "+ id +" is not exist!"
            ));

        String name = (String) data.get(0);
        String description = (String) data.get(1);

        double price = (double) data.get(2);
        
        if (
            name != null &&
            name.length() > 0 &&
            !name.equals(productEntity.getName())
        ) {
            productEntity.setName(name);
        }

        if (
            description != null &&
            description.length() > 0 &&
            !description.equals(productEntity.getDescription())
        ) {
            productEntity.setDescription(description);
        }

        if (
            price >= 0 &&
            price != (double) productEntity.getPrice()
        ) {
            productEntity.setPrice(price);
        }
    }

    public void deleteById(Long id) {
        boolean isExist = productRepository.existsById(id);

        if (!isExist) {
            throw new IllegalStateException("product with id: "+ id +" is not exist!");
        }

        productRepository.deleteById(id);
    }
}
