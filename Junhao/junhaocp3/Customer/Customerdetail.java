/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package customer;

import java.time.LocalDate;

/**
 *
 * @author hlaing
 */
public class Customerdetail {
    private int custNRIC;
    private String custName;
    private String DOB;
    private String email;
    private String nationality;
    private int phoneNo;
    private String gender;
    private String address;
    private String createdate;

    public Customerdetail(String custName, String DOB, int custNRIC, String email, String nationality, int phoneNo, String gender, String address, String createdate) {
        this.custName = custName;
        this.DOB = DOB;
        this.custNRIC = custNRIC;
        this.email = email;
        this.nationality = nationality;
        this.phoneNo = phoneNo;
        this.gender = gender;
        this.address = address;
        this.createdate = createdate;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }

    public int getCustNRIC() {
        return custNRIC;
    }

    public void setCustNRIC(int custNRIC) {
        this.custNRIC = custNRIC;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public int getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(int phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCreatedate() {
        return createdate;
    }

    public void setCreatedate(String createdate) {
        this.createdate = createdate;
    }

    @Override
    public String toString() {
        return "Customerdetail{" + "custNRIC=" + custNRIC + ", custName=" + custName + ", DOB=" + DOB + ", email=" + email + ", nationality=" + nationality + ", phoneNo=" + phoneNo + ", gender=" + gender + ", address=" + address + ", createdate=" + createdate + '}';
    }

   
    
}
