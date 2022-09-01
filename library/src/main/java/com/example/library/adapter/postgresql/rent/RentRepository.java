package com.example.library.adapter.postgresql.rent;

import com.example.library.adapter.postgresql.auth.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentRepository extends JpaRepository<Rent, Long> {
    List<Rent> findAllByUser(User user);
}
