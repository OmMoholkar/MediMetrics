package com.example.medimetrics.data.network

import retrofit2.Call
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface ApiService {
    @FormUrlEncoded
    @POST("login.php")
    fun login(
        @Field("userId") username: String,
        @Field("password") password: String
    ): Call<EmployeeResponse>
}

data class EmployeeResponse(
    val status: String,
    val name: String?,
    val area: String?,
    val photo: String?
)
