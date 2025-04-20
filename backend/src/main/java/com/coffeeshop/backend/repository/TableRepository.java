package com.coffeeshop.backend.repository;

import com.coffeeshop.backend.model.CoffeeTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TableRepository extends JpaRepository<CoffeeTable, Long> {
}