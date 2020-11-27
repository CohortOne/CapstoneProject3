/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package customer;

import com.sun.jdi.connect.spi.Connection;
import java.sql.CallableStatement;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
 
/**
/**
 *
 * @author hlaing
 */
public class AccountDAO {
    public static Statement initA() throws Exception {
        java.sql.Connection connA = initConn();

        return connA.createStatement();
    }
    
    public static java.sql.Connection initConn() throws Exception {
        java.sql.Connection conn = null;
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager
                .getConnection("jdbc:mysql://localhost:3306/bank?useTimezone=true&serverTimezone=UTC&"
                        + "user=root&password=mysql");

        return conn;
    }
    public static  int accNextID(){
        try{
            Statement stmt = AccountDAO.initA();
            String AID = "select max(accountno) from bank.account;";
            ResultSet rs = stmt.executeQuery(AID);
            if(rs.next())
              return rs.getInt(1)+1 ;   
            else 
                return 1;
        }catch(Exception e){
            System.out.println(" Exception from AccountDAO :: " + e.getMessage());
            e.printStackTrace();
        }
        return 0;
    }
    public static boolean insertType(Account a) throws Exception{
        Statement stmt = AccountDAO.initA();
        
        String insStmt = "insert into bank.account (accountno, accounttype, interestrate, accbalance) "
                + " values(" + a.getAccountno() + 
                ",\"" + a.getAccounttype() + "\","+ a.getInterestrate() +"," + a.getAccbalance()+");";
        System.out.println( insStmt );
        int result = stmt.executeUpdate(insStmt);
        
        if(result > 0){
            System.out.println(" Insert Success ");
        }else {
            System.out.println(" Insert Fail ");
        }
        
        return true;
    }    
    public static boolean delAccount(int AID) throws Exception{
        Statement stmt = AccountDAO.initA();     
        String delStmt = "delete from bank.account where accountno = " + AID + ";";
        
        int result = stmt.executeUpdate(delStmt);
        if(result > 0){
            System.out.println(" Delete Success ");
        }else {
            System.out.println(" Delete  Fail ");
        }
        return true;
    }
    public static List <Account> listAccount() throws Exception{
        Statement stmt = AccountDAO.initA();
        List <Account> acctList = new ArrayList<>();
        String qStmt = "Select * from bank.account;";
  
        ResultSet rs = stmt.executeQuery(qStmt);
        while(rs.next()){
            acctList.add(new Account(rs.getInt("accountno"),rs.getString("accounttype"),rs.getInt("interestrate"),rs.getInt("accbalance")));        
        }
    
            return acctList;
    }  
   
}