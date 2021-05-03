# -*- coding: UTF-8 -*-
# Setup
from flask import Flask, render_template, request, url_for, flash, redirect
from datetime import datetime
from smtplib import SMTP
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json
import time
from logging.config import dictConfig

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})

# Flask
app = Flask(__name__)


@app.before_first_request
def _declareStuff():
    global numberOfVisitors
    global numberOfSimpleForms
    global numberOfCalcForms
    numberOfVisitors = 0
    numberOfSimpleForms = 0
    numberOfCalcForms = 0

@app.route('/')
def main():
    global numberOfVisitors
    numberOfVisitors += 1
    app.logger.info("STATS: Visits = "+str(numberOfVisitors))
    return render_template('index.html')

#TODO: добавить счетчик использования калькулятора
@app.route('/form', methods=['POST'])
def form():
    app.logger.info("Form submited: "+str(request.form))
    try:
        data = json.loads(request.form['data'])

        if request.form['calc'] != "":
            calc = json.loads(request.form['calc'])
        else:
            calc = None

        if send_mail(data, calc):
            return "ok"
        else:
            return "fail"
    except Exception as e:
        app.loggin.error("Error receiving data: "+str(e))
        return "fail"


# Other methods
def send_mail(data, calc):
    smtp_server = "smtp.gmail.com"
    password = "4b6a9b0b"

    sender_email = "eurostyle.bot@gmail.com"
    receiver_email = "eurostyleast2014@gmail.com"

    name = data["name"]
    phone = data["phone"]
    msg = data["message"]
    
    message = MIMEMultipart('alternative')
    app.logger.info("New mail was generated")
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = "Заявка на ремонт от "+name

    attachText = "Имя клиента: "+name
    attachText += "\nТелефонный номер: "+phone

    app.logger.info(data)

    if msg != None:
        attachText += "\nДополнительное сообщение: "+msg

    if calc != None:
        global numberOfCalcForms
        numberOfCalcForms += 1
        app.logger.info("STATS: Calc = "+str(numberOfCalcForms))
        app.logger.info(calc)
        attachText += "\n-------------------"
        attachText += "\nСведения о квартире"
        attachText += "\nПлощадь: "+str(calc["0"]) + " кв.м."
        house_type = "Новый дом"
        if calc["1"] == 1:
            house_type = "Старый дом"
        
        attachText += "\nВид дома: "+house_type

        ceil = "3 метра или ниже"
        if calc["2"] == 2:
            ceil = "Выше 3 метров"
        attachText += "\nВысота потолков: "+ceil

        package = "Базовый"
        if calc["3"] == 2:
            package = "Базовый +"
        if calc["3"] == 3:
            package = "Премиум"
        attachText += "\nПакет ремонта: "+package

        demontage = "Нет"
        if calc["4"] == 2:
            demontage = "Да"

        attachText += "\nДемонтаж: "+demontage
        attachText += "\nРассчитанная сумма " + calc["5"]+"₸"
    else:
        global numberOfSimpleForms
        numberOfSimpleForms += 1
        app.logger.info("STATS: Forms = "+str(numberOfSimpleForms))


    message.attach(MIMEText(attachText))
    app.logger.info("Starting sending operation")
    try:
        server = SMTP(smtp_server, 25)
        app.logger.info("Server for mail created")

        server.connect(smtp_server, 25)
        server.ehlo()
        server.starttls()
        server.ehlo()

        server.login(sender_email, password)
        app.logger.info("Server for mail logged in")

        server.sendmail(sender_email, receiver_email, message.as_string())
        app.logger.info("Server for mail sent email")

        server.quit()
        app.logger.info("Server for mail quited")
        return True
    except Exception as e:
        app.logger.error("Error sending email: "+str(e))
        return False




# if __name__ == '__main__':
#     app.logger.info("Server starting...")
#     app.run(host='0.0.0.0', port=5000, threaded=True)
