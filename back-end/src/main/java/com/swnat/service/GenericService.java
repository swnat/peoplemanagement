package com.swnat.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

@Service
@Transactional
public abstract class GenericService<T, K extends Serializable> implements IGenericService<T, K> {

    @Override
    @Transactional(readOnly = true)
    public List<T> getAll() {
        return getRepository().findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> getAllPagination(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page-1, size);
        Page<T> result = getRepository().findAll(pageRequest);
        return result.getContent();
    }


    @Override
    public T add(T entity) {
        return getRepository().save(entity);
    }

    @Override
    public T update(K id, T entity) {
        return getRepository().save(entity);
    }

    @Override
    public T getOne(K id) {
        return getRepository().getOne(id);
    }

    @Override
    public void delete(K id) {
        getRepository().deleteById(id);
    }

}