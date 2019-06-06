package com.unichat;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.graphics.Color;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Unichat";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set the Android background to white after 8 seconds
        // to fix the splashscreen flash when the keyboard is shown
        new CountDownTimer(8000, 1000) {

            public void onTick(long millisUntilFinished) {
            }

            public void onFinish() {
                getWindow().getDecorView().setBackgroundColor(Color.WHITE);
            }

        }.start();
    }
}
