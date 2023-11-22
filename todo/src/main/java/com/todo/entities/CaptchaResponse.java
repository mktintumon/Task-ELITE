package com.todo.entities;

public class CaptchaResponse {
    private String imageUrl;

    public CaptchaResponse(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
