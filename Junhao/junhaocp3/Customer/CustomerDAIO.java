/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package customer;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
 
/**
 *
 * @author hlaing
 */
public class CustomerDAIO {
    public static Statement init() throws Exception {
        Connection conn = initConn();

        return conn.createStatement();
    }
    
    public static Connection initConn() throws Exception {
        Connection conn = null;
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager
                .getConnection("jdbc:mysql://localhost:3306/bank?useTimezone=true&serverTimezone=UTC&"
                        + "user=root&password=mysql");

        return conn;
    }
    
    public static  int getNextID(){
        try{
            Statement stmt = CustomerDAIO.init();
            String nxID = "select max(custNRIC) from bank.customer;";
            ResultSet rs = stmt.executeQuery(nxID);
            if(rs.next())
              return rs.getInt(1)+1 ;   
            else 
                return 1;
        }catch(Exception e){
            System.out.println(" Exception from CustomerDIAO :: " + e.getMessage());
            e.printStackTrace();
        }
        return 0;
    }
    
    public static boolean insertCustomer(Customerdetail c) throws Exception{
        Statement stmt = CustomerDAIO.init();
        
        String insStmt = "insert into bank.customer (custNRIC, custName, DOB, email, phoneNo, nationality,gender,address,createdate) "
                + " values(" + c.getCustNRIC() + 
                ",\"" + c.getCustName() + "\",\"" + c.getDOB() +"\","
                + "\"" + c.getEmail() + "\"," + c.getPhoneNo() + ",\"" + c.getNationality() +"\",\"" + c.getGender()
                + "\",\"" + c.getAddress() + "\",\"" + c.getCreatedate() + "\");";
        
        int result = stmt.executeUpdate(insStmt);
        
        if(result > 0){
            System.out.println(" Insert Success ");
            logutil.doInfoLog(" Insert Successful ");
        }else {
            System.out.println(" Insert Fail ");
            logutil.doInfoLog(" Insert Failed ");
        }
        
        return true;
    }    
    
    public static boolean delCustomer(int cid) throws Exception{
        Statement stmt = CustomerDAIO.init();     
        String delStmt = "delete from bank.customer where custNRIC = " + cid + ";";
        
        int result = stmt.executeUpdate(delStmt);
        if(result > 0){
            System.out.println(" Delete Success ");
        }else {
            System.out.println(" Delete  Fail ");
        }
        return true;
    }
    
    public static List <Customerdetail> listCustomer() throws Exception{
        Statement stmt = CustomerDAIO.init();
        List <Customerdetail> custList = new ArrayList<>();
        String qStmt = "Select * from bank.customer;";
  
        ResultSet rs = stmt.executeQuery(qStmt);
        while(rs.next()){
            custList.add(new Customerdetail(rs.getString("custName"),rs.getString("DOB"),rs.getInt("custNRIC"),rs.getString("email"),rs.getString("nationality"),rs.getInt("phoneNo"),rs.getString("gender"),rs.getString("address")  ,rs.getString("createdate")));        
        }
    
            return custList;
    }  

    public static List <Customerdetail> listCustomerOrderByDOB() throws Exception{
        Connection conn = CustomerDAIO.initConn();
        List <Customerdetail> custList = new ArrayList<>();
        String qStmt = "{CALL GetCustomer()}";
        
        CallableStatement cstmt = (CallableStatement)conn.prepareCall(qStmt);
        ResultSet rs = cstmt.executeQuery();
    
        while(rs.next()){
           Customerdetail c = new Customerdetail(rs.getString("custName"),rs.getString("DOB"),rs.getInt("custNRIC"),rs.getString("email"),rs.getString("nationality"),rs.getInt("phoneNo"),rs.getString("gender"),rs.getString("address")  ,rs.getString("createdate"));      
        }
    
        return custList;
    }
    
    public static Customerdetail getCustomer(int custNRIC) throws Exception{
        Statement stmt = CustomerDAIO.init();
        Customerdetail cust = null;
        String qStmt = "Select * from bank.customer where custNRIC = " + cust + ";";
        
        ResultSet rs = stmt.executeQuery(qStmt);
        while(rs.next()){
            cust = (new Customerdetail(rs.getString("custName"),rs.getString("DOB"),rs.getInt("custNRIC"),rs.getString("email"),rs.getString("nationality"),rs.getInt("phoneNo"),rs.getString("gender"),rs.getString("address")  ,rs.getString("createdate")));        }     
   return cust;
    
    }
    public static List <Customerdetail> getCustomer(String phoneNo) throws Exception{
        Connection conn = CustomerDAIO.initConn();
        List <Customerdetail> custList = new ArrayList<>();
        String qStmt = "Select * from bank.customer where phoneNo = ? ";
        
        PreparedStatement pStmt = conn.prepareStatement(qStmt);
        pStmt.setString(1, phoneNo);
        ResultSet rs = pStmt.executeQuery();
        while(rs.next()){
            custList.add(new Customerdetail(rs.getString("custName"),rs.getString("DOB"),rs.getInt("custNRIC"),rs.getString("email"),rs.getString("nationality"),rs.getInt("phoneNo"),rs.getString("gender"),rs.getString("address")  ,rs.getString("createdate")));        }     
        return custList;
    }
    
    public static boolean updateCustomer(Customerdetail c) throws Exception{
        Statement stmt = CustomerDAIO.init();
        String updStmt = "Update bank.customer set email = '" + c.getEmail() + "', phoneNO = '" + c.getPhoneNo()+ "' where custNRIC = " + c.getCustNRIC() + ";";
        
        if(stmt.executeUpdate(updStmt) > 0){
           System.out.println(" Update Success ");
        }else {
            System.out.println(" Update Failed ");
        }
        return true;
    }
}


