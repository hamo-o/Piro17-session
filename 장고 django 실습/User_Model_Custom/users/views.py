
from django.shortcuts import redirect, render
from django.views import View
from . import forms
from django.contrib.auth import authenticate, login, logout

# Create your views here.

def main(request):
    return render(request, "users/main.html")

class LoginView(View):
    def get(self, request):
        form = forms.LoginForm()
        ctx = {"form": form}
        return render(request, "users/login.html", ctx)
    
    def post(self, request):
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            password = form.cleaned_data.get("password")
            user = authenticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                return render(request, "users/success.html")
        
        return render(request, "users/login.html", {"form": form})

def log_out(request):
    logout(request)
    return redirect("users:main")

def sign_up(request):
    if request.method == "POST":
        form = forms.SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return render(request, "users/success.html")
        return redirect("users:sign_up")
    else:
        form = forms.SignupForm()
        return render(request, "users/signup.html", {"form":form})