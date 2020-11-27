/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package customer;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
    import com.sun.jdi.connect.spi.Connection;
import java.sql.CallableStatement;

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
public class transactionDAO {

 

    public static Statement initt() throws Exception {
        java.sql.Connection connt = initConn();

        return connt.createStatement();
    }
    
    public static java.sql.Connection initConn() throws Exception {
        java.sql.Connection conn = null;
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager
                .getConnection("jdbc:mysql://localhost:3306/bank?useTimezone=true&serverTimezone=UTC&"
                        + "user=root&password=mysql");

        return conn;
    }
    public static  int transactionID(){
        try{
            Statement stmt = transactionDAO.initt();
            String tID = "select max(accountno) from bank.transactions;";
            ResultSet rs = stmt.executeQuery(tID);
            if(rs.next())
              return rs.getInt(1)+1 ;   
            else 
                return 1;
        }catch(Exception e){
            System.out.println(" Exception from transactionDAO :: " + e.getMessage());
            e.printStackTrace();
        }
        return 0;
    }
    public static boolean insertType(Transaction a) throws Exception{
        Statement stmt = transactionDAO.initt();
        
        String insStmt = "insert into bank.transactions (refno, depositAmt, withdrawAmt, timestamp) "
                + " values(" + a.getRefno() + 
                ",\"" + a.getDepositAmt() + "\","+ a.getWithdrawAmt() +"," + a.getTimestamp()+");";
        System.out.println( insStmt );
        int result = stmt.executeUpdate(insStmt);
        
        if(result > 0){
            System.out.println(" Insert Success ");
        }else {
            System.out.println(" Insert Fail ");
        }
        
        return true;
    }    
//    public static boolean delAccount(int AID) throws Exception{
//        Statement stmt = AccountDAO.initA();     
//        String delStmt = "delete from bank.account where accountno = " + AID + ";";
//        
//        int result = stmt.executeUpdate(delStmt);
//        if(result > 0){
//            System.out.println(" Delete Success ");
//        }else {
//            System.out.println(" Delete  Fail ");
//        }
//        return true;
//    }
    public static List <Transaction> listTransation() throws Exception{
        Statement stmt = transactionDAO.initt();
        List <Transaction> acctList = new ArrayList<>();
        String qStmt = "Select * from bank.transactions;";
  
        ResultSet rs = stmt.executeQuery(qStmt);
        while(rs.next()){
            acctList.add(new Transaction(rs.getInt("refno"),rs.getInt("depositAmt"),rs.getInt("withdrawAmt"),rs.getString("timestamp")));        
        }
    
            return acctList;
    }  
   
}
    

