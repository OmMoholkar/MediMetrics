package com.example.medimetrics.viewmodel

import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.medimetrics.data.model.Employee
import com.example.medimetrics.data.network.ApiClient
import com.example.medimetrics.data.network.ApiService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.awaitResponse
import java.io.IOException

class LoginViewModel : ViewModel() {

    var loginStatus = mutableStateOf<String>("")
    var employeeData = mutableStateOf<Employee?>(null)

    private val apiService = ApiClient.retrofit.create(ApiService::class.java)

    fun login(username: String, password: String) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                val response = apiService.login(username, password).awaitResponse()
                if (response.isSuccessful) {
                    response.body()?.let {
                        if (it.status == "success") {
                            employeeData.value = Employee(it.name!!, it.area!!, it.photo!!)
                            loginStatus.value = "success"
                        } else {
                            loginStatus.value = "failure"
                        }
                    }
                } else {
                    loginStatus.value = "failure"
                }
            } catch (e: IOException) {
                Log.e("NetworkError", "Error connecting to server", e)
            }
        }
    }
}
