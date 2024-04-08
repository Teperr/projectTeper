from flask import Flask, render_template
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    # הרצת הקובץ PY
    subprocess.run(['python', 'your_script.py'])
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
