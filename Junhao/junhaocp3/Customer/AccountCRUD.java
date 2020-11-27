/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package customer;

import static customer.Customer.myObj;
import static customer.Customer.printFooter;
import static customer.Customer.printHeader;
import java.util.Scanner;

/**
 *
 * @author hlaing
 */
public class AccountCRUD {
    public static Scanner myObj = new Scanner(System.in);
        public static int insAccount() throws Exception {
        new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        int AID = AccountDAO.accNextID();
        System.out.println(" \tEnter the following details  :: ");
        printFooter();
        System.out.println(" \n\t\t        acc no    \t : " + AID);
        System.out.print(" \n\t\t         accountno     \t : ");
        int accountno = myObj.nextInt();
        System.out.print(" \n\t\t         accounttype     \t : ");
        String accounttype = myObj.next();
        System.out.print(" \n\t\t         interestrate     \t : ");
       int interestrate = myObj.nextInt();
        System.out.print(" \n\t\t        accountbalance \t : ");
        int accbalance = myObj.nextInt();
        
       
        printHeader();
        //  public Customerdetail(String custName, String DOB, int custNRIC, String email, String nationality, int phoneNo, String gender, String address, String createdate) {
  
        if ( AccountDAO.insertType (new Account (accountno, accounttype,interestrate, accbalance))) {
        } else {
            printFooter();
             }
        return 1;
    }

//    public static int DisplayOptions() throws Exception {
//        new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
//        System.out.println("\n ********************************************************************************************* ");
//        System.out.println("\n\t Customer  Operations ::: ");
//        System.out.println(" \t----------------------------------");
//        System.out.println("\n ********************************************************************************************* ");
//
//        System.out.println(" \tFollowing are the options :: ");
//        System.out.println(" \n\t\t1 >> Insert Customer ");
//        System.out.println(" \n\t\t2 >> Update Customer ");
//        System.out.println(" \n\t\t3 >> Delete Customer ");
//        System.out.println(" \n\t\t4 >> List Customer "); 
//        System.out.println(" \n\t\t5 >> List Customers Order By DOB ");
//        System.out.println(" \n\t\t6 >> Find Customers By PhoneNo ");
//        System.out.println(" \n\t\t0 >> Exit ");
//
//        System.out.println("\n ********************************************************************************************* ");
//        // Create a Scanner object
//        System.out.print(" Enter a numer to carry out the operation  :   ");
//        int optVal;
//        try {
//            optVal = myObj.nextInt();
//        } catch (Exception e) {
//
//            optVal = -1;
//        }
//        return optVal;
//    }
}
