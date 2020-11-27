/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package customer;

import java.util.Scanner;

/**
 *
 * @author hlaing
 */
public class transactionCRUD {
            
       public static void main(String args[] )

    { 
    int balance = 5000, withdrawAmt, depositAmt;

        Scanner s = new Scanner(System.in);

        while(true)

        {

            System.out.println("Automated Teller Machine");

            System.out.println("Choose 1 for Withdraw");

            System.out.println("Choose 2 for Deposit");

            System.out.println("Choose 3 for Check Balance");

            System.out.println("Choose 4 for EXIT");

            System.out.print("Choose the operation you want to perform:");

            int n = s.nextInt();

            switch(n)

            {

                case 1:

                System.out.print("Enter money to be withdrawn:");

                withdrawAmt = s.nextInt();

                if(balance >= withdrawAmt)

                {

                    balance = balance - withdrawAmt;

                    System.out.println("Please collect your money");

                }

                else

                {

                    System.out.println("Insufficient Balance");

                }

                System.out.println("");

                break;

 

                case 2:

                System.out.print("Enter money to be deposited:");

                depositAmt = s.nextInt();

                balance = balance + depositAmt;

                System.out.println("Your Money has been successfully depsited");

                System.out.println("");

                break;

 

                case 3:

                System.out.println("Balance : "+balance);

                System.out.println("");

                break;

 

                case 4:

                System.exit(0);

            }

        }
    }
}

        
    



