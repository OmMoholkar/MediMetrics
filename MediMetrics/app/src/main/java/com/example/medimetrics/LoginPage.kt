package com.example.medimetrics

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.jetpackcomposeauthui.components.CButton
import com.example.jetpackcomposeauthui.components.CTextField

@Composable
fun LoginScreen(
//    navController: NavHostController
) {
    var employeeUsername by remember { mutableStateOf("") }
    var employeePassword by remember { mutableStateOf("") }

    // we can copy and paste and do changes for signup screen
    Surface{
        Box(modifier =  Modifier.fillMaxSize()){
            /// Background Image
            Image(painter = painterResource(id = R.drawable.leaves),
                contentDescription = null,
                modifier = Modifier
                    .requiredSize(600.dp)
                    .padding(top = 304.dp)
                    .height(190.dp)
                    .align(Alignment.BottomCenter),
                colorFilter = ColorFilter.tint(Color(0xFF253334))
            )
            Image(painter = painterResource(id = R.drawable.leaves),
                contentDescription = null,
                modifier = Modifier
                    .rotate(180F)
                    .requiredSize(650.dp)
                    .padding(top = 374.dp)
                    .align(Alignment.TopCenter),
                colorFilter = ColorFilter.tint(Color(0xFF253334))
            )
            /// Content
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 24.dp, vertical = 204.dp)
            ) {
                Image(
                    painter = painterResource(R.drawable.medimetrics_logo),
                    contentDescription = null,
                    modifier = Modifier.padding(bottom = 24.dp),
//                    colorFilter = ColorFilter.tint(Color.Green)
                )

                Text(text = "Log In",
                    style = TextStyle(
                        fontSize = 28.sp,
//                        fontFamily = AlegreyaFontFamily,
                        fontWeight = FontWeight(500),
                        color = Color.Black
                    ),
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )

                // Text Field
                CTextField(hint = "Username", value = employeeUsername, onValueChange = { employeeUsername = it }, isPassword = false )

                CTextField(hint = "Password", value = employeePassword, onValueChange = { employeePassword = it }, isPassword = true )

                Spacer(modifier = Modifier.height(24.dp))

                CButton(text = "Log In")
            }
        }
    }
}


@Preview(showBackground = true)
@Composable
fun LoginScreenPreview() {
    LoginScreen()
}