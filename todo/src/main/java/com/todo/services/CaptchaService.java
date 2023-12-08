package com.todo.services;

import java.awt.Color;
import java.awt.Font;
import cn.apiclub.captcha.Captcha;
import cn.apiclub.captcha.backgrounds.GradiatedBackgroundProducer;
import cn.apiclub.captcha.noise.CurvedLineNoiseProducer;
import cn.apiclub.captcha.text.producer.DefaultTextProducer;
import cn.apiclub.captcha.text.renderer.DefaultWordRenderer;
import cn.apiclub.captcha.text.renderer.WordRenderer;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import javax.imageio.ImageIO;

@Service
public class CaptchaService {

    public static Captcha createCaptcha(Integer width, Integer height) {

        List<Color> colors = new ArrayList<Color>();
        colors.add(Color.GREEN);
        colors.add(Color.RED);
        colors.add(Color.BLACK);

        List<Font> fonts = new ArrayList<Font>();
        fonts.add(new Font("Geneva", 2, 32));
        fonts.add(new Font("Courier", 3, 32));

        WordRenderer wordRenderer = new DefaultWordRenderer(colors, fonts);

        return new Captcha.Builder(width, height)
                .addBackground(new GradiatedBackgroundProducer())
                .addText(new DefaultTextProducer(), wordRenderer)
                .addNoise(new CurvedLineNoiseProducer())
                .build();
    }

    public String encodeCaptcha(Captcha captcha) {
        String image = null;
        try {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(captcha.getImage(), "jpg", bos);
            byte[] byteArray = Base64.getEncoder().encode(bos.toByteArray());
            image = new String(byteArray);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return image;
    }
}
