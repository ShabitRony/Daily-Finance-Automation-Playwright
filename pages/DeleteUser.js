import { expect } from "@playwright/test";

export default class DeleteUser {
  constructor(request) {
    this.request = request;
    this.baseUrl = "https://dailyfinanceapi.roadtocareer.net/api/user";
    this.defaultHeaders = {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.ADMIN_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluX2lkIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU1MjQwNDY0LCJleHAiOjE3NTc4MzI0NjR9.rSg0vXD9frXNJK06GKJUrsMy5HHtRRWPQeuNAIQVeQI"}`
    };
  }

  async deleteUserById(userId) {
    const deleteUrl = `${this.baseUrl}/${userId}`;
    console.log(`🆔 Deleting user: ${userId}`);

    const res = await this.request.delete(deleteUrl, {
      headers: this.defaultHeaders,
    });

    // ✅ Assertions
    expect(res.status(), `Unexpected status code`).toBe(200);
    expect(res.url()).toBe(deleteUrl);

    const body = await res.json();
    expect(body.message).toContain("User deleted successfully");

    console.log("✅ Delete successful:", body);
    return body;
  }
}
