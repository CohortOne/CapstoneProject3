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
public class Transaction {
    private int refno; 
    private int depositAmt;
     private int withdrawAmt; 
     private String timestamp;
     

    @Override
    public String toString() {
        return "Transaction{" + "refno=" + refno + ", depositAmt=" + depositAmt + ", withdrawAmt=" + withdrawAmt + ", timestamp=" + timestamp + '}';
    }

    public Transaction(int refno, int depositAmt, int withdrawAmt, String timestamp) {
        this.refno = refno;
        this.depositAmt = depositAmt;
        this.withdrawAmt = withdrawAmt;
        this.timestamp = timestamp;
    }

    public int getRefno() {
        return refno;
    }

    public void setRefno(int refno) {
        this.refno = refno;
    }

    public int getDepositAmt() {
        return depositAmt;
    }

    public void setDepositAmt(int depositAmt) {
        this.depositAmt = depositAmt;
    }

    public int getWithdrawAmt() {
        return withdrawAmt;
    }

    public void setWithdrawAmt(int withdrawAmt) {
        this.withdrawAmt = withdrawAmt;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
