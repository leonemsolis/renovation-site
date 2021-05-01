# Setup
from flask import Flask, render_template, request, url_for, flash, redirect
from flask_jsglue import JSGlue
import logging
from datetime import datetime
import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json


_logger = logging.getLogger(__name__)

def log(message):
    timestamp = datetime.now().strftime("%d/%m/%Y-%H:%M:%S")
    _logger.warning(timestamp+" >> "+str(message))


# Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = '54afd66aeec974cc13d1de3b0cc20657'
# jsglue = JSGlue(app)



@app.route('/')
def main():
    return render_template('index.html')

#TODO: добавить счетчик использования калькулятора
@app.route('/form', methods=['POST'])
def form():
    return 'ok'
    log(request.form)
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
        log("Error receiving data: "+str(e))
        return "fail"


# Other methods
def send_mail(data, calc):
    smtp_server = "smtp.gmail.com"
    port = 465
    password = "4b6a9b0b"
    context = ssl.create_default_context()

    sender_email = "eurostyle.bot@gmail.com"
    receiver_email = "leonemsolis@gmail.com"

    name = data["name"]
    phone = data["phone"]
    msg = data["message"]
    
    message = MIMEMultipart('alternative')
    log("New mail was generated")
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = "Заявка на ремонт от "+name

    attachText = "Имя клиента: "+name
    attachText += "\nТелефонный номер: "+phone

    log(data)

    if msg != None:
        attachText += "\nДополнительное сообщение: "+msg

    if calc != None:
        log(calc)
        attachText += "\n-------------------"
        attachText += "\nСведения о квартире"
        attachText += "\nПлощадь: "+str(calc["0"]) + " кв.м."
        house_type = "Новый дом"
        if calc["1"] == 1:
            house_type = "Старый дом"
        
        attachText += "\nВид дома: "+house_type
        attachText += "\nВысота потолков: "+str(calc["2"]) + " м."
        package = "Базовый"
        if calc["3"] == 1:
            package = "Базовый +"
        if calc["3"] == 2:
            package = "Премиум"
        attachText += "\nПакет ремонта: "+package
        demontage = "Нет"
        if calc["4"] == 1:
            demontage = "Да"

        attachText += "\nДемонтаж: "+demontage
        attachText += "\nРассчитанная сумма " + calc["5"]+"₸"

    message.attach(MIMEText(attachText))

    try:
        server = smtplib.SMTP_SSL(smtp_server, port, context=context)
        server.login("eurostyle.bot@gmail.com", password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        server.quit()
        return True
    except Exception as e:
        log("Error sending email: "+str(e))
        return False




# if __name__ == '__main__':
#     log("Photo server for websocket data server is up and listening!")
#     app.run(host='0.0.0.0', port=80, threaded=True)
