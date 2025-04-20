package com.coffeeshop.backend.controller;

import com.coffeeshop.backend.model.CoffeeTable;
import com.coffeeshop.backend.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class TableController {

    @Autowired
    private TableRepository tableRepository;

    @PostMapping
    public ResponseEntity<?> createTable(@RequestBody CoffeeTable table) {
        tableRepository.save(table);
        return ResponseEntity.ok("Tạo bàn thành công");
    }

    @GetMapping
    public List<CoffeeTable> getAllTables() {
        return tableRepository.findAll();
    }
}