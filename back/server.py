# Setup
from flask import Flask, render_template, request, url_for, flash, redirect
import logging
from datetime import datetime
import smtplib, ssl

_logger = logging.getLogger(__name__)

def log(message):
    timestamp = datetime.now().strftime("%d/%m/%Y-%H:%M:%S")
    _logger.warning(timestamp+" >> "+str(message))


# Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = '54afd66aeec974cc13d1de3b0cc20657'


@app.route('/')
def main():
    return render_template('index.html')

#TODO: добавить счетчик использования калькулятора
@app.route('/form', methods=['POST'])
def form():
    log("HELLO ALO");
    return None






# Other methods
def send_mail():
    port = 465
    password = "4b6a9b0b"
    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        sender_email = "eurostyle.bot@gmail.com"
        receiver_email = "leonemsolis@gmail.com"
        message = """\
        Mail title

        Mail body"""
        server.login("eurostyle.bot@gmail.com", password)
        server.sendmail(sender_email, receiver_email, message)



# if __name__ == '__main__':
#     log("Photo server for websocket data server is up and listening!")
#     app.run(host='0.0.0.0', port=80, threaded=True)
