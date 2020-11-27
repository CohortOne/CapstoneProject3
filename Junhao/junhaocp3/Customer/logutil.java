/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package customer;

import java.util.logging.Logger;

/**
 *
 * @author hlaing
 */
public class logutil {
    private static final Logger LOGGER = Logger.getLogger(logutil.class.getName());

    
    public static void doInfoLog(String s){
        LOGGER.info(s);
    }
    
    public static void doErrorLog(String s){
    
    }
    
    public static void doWarnLog(String s){
    
    }
    
    public static void doSevereLog(String s){
    
    }
    
    public static void doExceptionLog(String s){
    
    }
    
    public static void loadLogConfig() {
        // Do all log configuration - .properties 
        // Handlers 
        //
    }
}
