<template>
  <div class="about">
    <body>
    <h1>This is an about page</h1><br>
    <div style="text-align: center;">
      <div style="display: inline-block; text-align: left;">
        <p>
          Stipendium is a payment module on the solana blockchain. <br><br>

          Go on the merchand page and create your account, then log-in, go in Account information <br>
          and write your solana wallet public address.
          Generate your API keys and keep it safe. <br><br>

          Once you have your API keys and your wallet configured, go on your website server where your <br>
          function pay is triggered. To create a transaction on stipendium make an http GET Request at this link :
          <br><br> http://backend.sc2aips9849.universe.wf/api/pay?amount=[AMOUNT]&key=[API_KEY]
          <br><br> Where AMOUNT is the amount you want to be paid in sol and API_KEY is your api key previously generated
          <br><br> The response will look like this :
          <br> { 
            <br>
            "url":"http://frontend.sc2aips9849.universe.wf/monitoring?transaction=[TRANSACTION_NB]" <br>
            }
            <br><br>
          Redirect your customer to this url where TRANSACTION_NB is the unique id of your transaction (the TRANSACTION_NB is already given).
          <br>During that time, fetch :<br><br> http://backend.sc2aips9849.universe.wf/api/monitoring?ordernb=[TRANSACTION_NB] <br>
          <br>every 2 seconds where TRANSACTION_NB is the transaction number you got from the previous request.<br><br>
          The response will look like that :<br><br>
          {<br>
            "transaction_nb":[TRANSACTION_NB],"public_key":"[A PUBLIC KEY]",<br>
            "amount_total":"[A NUMBER]",<br>
            "amount_to_pay":"[A NUMBER]",<br>
            "currency":"SOL",<br>
            "expiration":[A TIMESTAMP],<br>
            "status":"pending",<br>
            "message":"",<br>
            "store_name":"[A STORE NAME]"<br>
          } --> if the transaction is still pending <br><br>

          {"transaction_nb":[TRANSACTION_NB],"payment_status":"failed","message":"[TIMESTAMP]: time elapsed"} --> if the transaction failed <br><br>
          {"transaction_nb":[TRANSACTION_NB],"payment_status":"success","message":"[TIMESTAMP"} --> if the transaction was a success<br><br>

          To know the status of the transaction at any time just ask :<br><br>
          if response.status != null:<br>
            ----the transaction is still pending<br>
          else:<br>
            --if response.payment_status == "success":<br>
              ----payment successfull<br>
            --else:<br>
              ----payment failed<br>

          <br><br>
          Once the customer paid, the money is instantly transfered on the public address of your choice. <br>
          The fees are less than a 1 cent of euro equivalent in SOL, no matter the amount transfered.<br><br>
        </p>
      </div>
    </div>
    </body>
  </div>
</template>
