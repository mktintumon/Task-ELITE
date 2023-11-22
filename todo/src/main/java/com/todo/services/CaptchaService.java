package com.todo.services;

import cn.apiclub.captcha.Captcha;
import cn.apiclub.captcha.backgrounds.GradiatedBackgroundProducer;
import cn.apiclub.captcha.noise.CurvedLineNoiseProducer;
import cn.apiclub.captcha.text.producer.DefaultTextProducer;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import javax.imageio.ImageIO;

@Service
public class CaptchaService {

    public String generateCaptchaImage() {
        Captcha captcha = createCaptcha(200, 50);

        // Convert captcha image to Base64
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        try {
            ImageIO.write(captcha.getImage(), "png", os);
        } catch (IOException e) {
            e.printStackTrace();
        }

        String base64Image = Base64.getEncoder().encodeToString(os.toByteArray());
        return "data:image/png;base64," + base64Image;
    }

    public static Captcha createCaptcha(Integer width, Integer height) {

        return new Captcha.Builder(width, height)
                .addBackground(new GradiatedBackgroundProducer())
                .addText(new DefaultTextProducer())
                .addNoise(new CurvedLineNoiseProducer())
                .build();
    }
}
