/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package customer;

import static customer.AccountCRUD.insAccount;
import static customer.AccountDAO.accNextID;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

/**
 *
 * @author hlaing
 */
public class Customer {

    /**
     * @param args the command line arguments
     */
   
         public static Scanner myObj = new Scanner(System.in);
        

    public static int iteration = 1;

    public static void toContinue() {
        myObj.next();
    }

    public static String printPretty() {
        String s = "\n  |";
        for (int i = 0; i <= iteration; i++) {
            s += "---";
        }

        return s + " >> ";
    }

    public static int listCustomers() throws Exception {
        printHeader();
        System.out.println("\tID  \tName \t\t\tDOB   \t\t   Email  \t\tPhoneNo  \tStatus");
        printFooter();
        CustomerDAIO.listCustomer().stream().forEach(System.out::println);
        printFooter();
        return 1;
    }    
    
    public static int listCustomersByDOB() throws Exception {
        printHeader();
        System.out.println("\tID  \tName \t\t\tDOB   \t\t   Email  \t\tPhoneNo  \tStatus");
        printFooter();
        CustomerDAIO.listCustomerOrderByDOB().stream().forEach(System.out::println);
        printFooter();
        return 1;
    }
    
    public static int findCustomerByPhoneNo() throws Exception {
        printHeader();
        System.out.print(" \tEnter the PhoneNo to Find :: ");
        String phoneNo = myObj.next();
        
        printHeader();
        System.out.println("\tID  \tName \t\t\tDOB   \t\t   Email  \t\tPhoneNo  \tStatus");
        printFooter();
        CustomerDAIO.getCustomer(phoneNo).stream().forEach(System.out::println);
        printFooter();
        return 1;
    }

    public static int delCustomers() throws Exception {
        listCustomers();
        System.out.print(" \tEnter the Customer ID to Delete :: ");
        int cid = myObj.nextInt();
        System.out.print(" \tAre you sure [y/n][Y/N]:: ");
        String resp = myObj.next();
        if (resp.equalsIgnoreCase("y")) {
            System.out.println(" Initiating delete for Customer ID ::" + cid);
            printHeader();
            CustomerDAIO.delCustomer(cid);
            printFooter();
        }
        return 1;
    }

    public static int updCustomers() throws Exception {
        listCustomers();
        System.out.print(" \tEnter the Customer ID to Update :: ");
        int cid = myObj.nextInt();
        System.out.print(" \t You can only update Email and PhoneNo [Y/N][y/n]:: ");
        String resp = myObj.next();
        if (resp.equalsIgnoreCase("y")) {
            System.out.println(" Initiating update for Customer ID ::" + cid);
            printHeader();
            Customerdetail c = CustomerDAIO.getCustomer(cid);
            System.out.println(" Select Customer ::: ");
            System.out.print(c);
            printFooter();

            System.out.println(" \n\t\t   Current Email   \t : " + c.getEmail());
            System.out.print(" \n\t\t   New Email       \t : ");
            c.setEmail(myObj.next());
            System.out.println(" \n\t\t    Current Phone    \t : " + c.getPhoneNo());
            System.out.print(" \n\t\t    New  Phone          \t : ");
            c.setPhoneNo(myObj.nextInt());
            CustomerDAIO.updateCustomer(c);
            CustomerDAIO.init();
        }
        return 1;
    }

    public static int insCustomer() throws Exception {
        logutil.doInfoLog(" inside Insert Customer Method ");
        new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        int nxtID = CustomerDAIO.getNextID();
        System.out.println(" \tEnter the following details  :: ");
        printFooter();
        System.out.println(" \n\t\t        Customer ID    \t : " + nxtID);
        System.out.print(" \n\t\t         nric     \t : ");
        int NRIC = myObj.nextInt();
        System.out.print(" \n\t\t         Firstname     \t : ");
        String name = myObj.next();
        System.out.print(" \n\t\t         lastName     \t : ");
        name += " " + myObj.next();    //name = myObj.nextLine();
        System.out.print(" \n\t\t        Date Of Birth  \t : ");
        String dob = myObj.next();
        
        System.out.print(" \n\t\t        Email          \t : ");
        String nationality = myObj.next();
        System.out.print(" \n\t\t        nationality          \t : "); 
        String email = myObj.next();
        System.out.print(" \n\t\t        Phone          \t : ");
        int phoneNo = myObj.nextInt();
        String gender= myObj.next();
        System.out.print(" \n\t\t        gender          \t : ");
        String address= myObj.next();
        System.out.print(" \n\t\t        address          \t : ");
        String createdate = myObj.next();
        
        printHeader();
        //  public Customerdetail(String custName, String DOB, int custNRIC, String email, String nationality, int phoneNo, String gender, String address, String createdate) {
  
        if ( CustomerDAIO.insertCustomer (new Customerdetail (name, dob,NRIC, email, nationality,phoneNo, gender, address,createdate))) {
        } else {
            printFooter();
            logutil.doInfoLog(" About to insert customer with the following details ");
                    logutil.doInfoLog(new Customerdetail (name, dob,NRIC, email, nationality,phoneNo, gender, address,createdate).toString());

        }
                logutil.doInfoLog(" End of Method  ");
             
        return 1;
    }

    public static int DisplayOptions() throws Exception {
        
        new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        System.out.println("\n ********************************************************************************************* ");
        System.out.println("\n\t Customer  Operations ::: ");
        System.out.println(" \t----------------------------------");
        System.out.println("\n ********************************************************************************************* ");

        System.out.println(" \tFollowing are the options :: ");
        System.out.println(" \n\t\t1 >> Insert Customer ");
        System.out.println(" \n\t\t2 >> Update Customer ");
        System.out.println(" \n\t\t3 >> Delete Customer ");
        System.out.println(" \n\t\t4 >> List Customer "); 
        System.out.println(" \n\t\t5 >> List Customers Order By DOB ");
        System.out.println(" \n\t\t6 >> Find Customers By PhoneNo ");
        System.out.println(" \n\t\t7 >> account ");
        System.out.println(" \n\t\t8 >> caccount ");
        System.out.println(" \n\t\t0 >> Exit ");

        System.out.println("\n ********************************************************************************************* ");
        // Create a Scanner object
        System.out.print(" Enter a numer to carry out the operation  :   ");
        int optVal;
        try {
            optVal = myObj.nextInt();
        } catch (Exception e) {

            optVal = -1;
        }
        return optVal;
    }

    public static void printHeader() throws Exception {
        new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        System.out.println(" ==============================================================================================================================");

    }

    public static void printFooter() {
        System.out.println(" ==============================================================================================================================");
    }

    public static void main(String[] args) throws Exception {
            try {
        logutil.doInfoLog(" Start of the Application ");
        customerMenu();
        logutil.doInfoLog(" End of the Application ");
            } catch(Exception e){
                logutil.doExceptionLog(e.getMessage());
            }
    }
    
        
        
        public static void customerMenu() throws Exception{
        

        while (true) {
            int optionVal = DisplayOptions();

            printHeader();
            System.out.print("\t\t Option Selected : \t\t");
            switch (optionVal) {

                case 1:
                    System.out.println("Insert Customer  ");
                    logutil.doInfoLog(" About to invoke insCustomer() ");
                    printFooter();
                    insCustomer();
                    break;
                case 2:
                    System.out.println("Update Customer ::: ");
                    updCustomers();
                    break;
                case 3:
                    System.out.println("Delete Customer ::: ");
                    delCustomers();
                    break;
                case 4:
                    System.out.println("List Customers ::: ");
                    listCustomers();
                    break;
                case 5:
                    System.out.println("List Customers ::: ");
                    listCustomersByDOB();
                    break;
                case 6:
                    System.out.println("Find Customers By Phone No::: ");
                    findCustomerByPhoneNo();
                    break;
                    case 7:
                    System.out.println("account::: ");
                    insAccount();
                    break;
                  case 8:
                    System.out.println("caccount::: ");
                   accNextID();
                    break;  
                    
                    
                    
                    
                case 0:
                    System.out.println("Exit");
                    printFooter();
                    Thread.sleep(4000);
                    System.exit(0);
                    break;
                default:
                    //printHeader();
                    System.out.println(" \n\n \t\t #### Invalid Option ####");
                    printFooter();
                    Thread.sleep(4000);
                    break;
            }

            printFooter();
            System.out.print(" Press any key to continue.....");
            toContinue();
        }
    }

    

}

    
    

