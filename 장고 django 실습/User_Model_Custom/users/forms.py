from django import forms
from .models import User
from django.contrib.auth.forms import UserCreationForm

class LoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)
    
    def clean(self):
        input_email = self.cleaned_data.get("email")
        password = self.cleaned_data.get("password")
        
        try:
            user = User.objects.get(username=input_email)
            if user.check_password(password):
                return self.cleaned_data
            else:
                raise forms.ValidationError("password is wrong")
            
        except User.DoesNotExist:
            raise forms.ValidationError("There is no user")
        
class SignupForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]