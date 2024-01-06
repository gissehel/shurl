[ "${BASH_SOURCE[0]}" == "${0}" ] && echo "This script must be sourced, not executed !" && exit 1

if [ -d .venv ]; then
    echo "Virtual environment already exists."
    source .venv/bin/activate
else 
    echo "Creating virtual environment..."
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -U pip
    pip install -r requirements.txt
    echo "Virtual environment created."
fi

