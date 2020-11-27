/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package customer;

/**
 *
 * @author hlaing
 */
public class Account {
    private int accountno;
    private String accounttype;
    private int interestrate;
    private int accbalance;

    public int getAccountno() {
        return accountno;
    }

    public void setAccountno(int accountno) {
        this.accountno = accountno;
    }

    public String getAccounttype() {
        return accounttype;
    }

    public void setAccounttype(String accounttype) {
        this.accounttype = accounttype;
    }

    public int getInterestrate() {
        return interestrate;
    }

    public void setInterestrate(int interestrate) {
        this.interestrate = interestrate;
    }

    public int getAccbalance() {
        return accbalance;
    }

    public void setAccbalance(int accbalance) {
        this.accbalance = accbalance;
    }

    public Account(int accountno, String accounttype, int interestrate, int accbalance) {
        this.accountno = accountno;
        this.accounttype = accounttype;
        this.interestrate = interestrate;
        this.accbalance = accbalance;
    }

    @Override
    public String toString() {
        return "Account{" + "accountno=" + accountno + ", accounttype=" + accounttype + ", interestrate=" + interestrate + ", accbalance=" + accbalance + '}';
    }
  
}
