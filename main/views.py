from django.shortcuts import render, redirect, get_object_or_404

from portfolio import settings
from .models import Project, Skill, Contact, Profile
from .forms import ContactForm
from django.contrib import messages
from django.core.mail import send_mail

def home(request):
    projects = Project.objects.all()[:6]  # Show only 6 projects on home page
    skills = Skill.objects.all()
    profile = Profile.objects.first()
    
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact = form.save()

            # Send email to admin
            send_mail(
                subject=f"New Contact: {contact.subject}",
                message=f"From: {contact.name} <{contact.email}>\n\n{contact.message}",
                from_email='Rao Muzammil',
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )

            # Send confirmation to user
            send_mail(
                subject="Thank you for contacting us",
                message=f"Hi,\n\nWe've received your message and will get back to you soon.\n\nYour message:\n{contact.message}",
                from_email='Rao Muzammil',
                recipient_list=[contact.email],
                fail_silently=False,
            )

            messages.success(request, 'Your message has been sent successfully!')
    else:
        form = ContactForm()
    
    context = {
        'projects': projects,
        'skills': skills,
        'form': form,
        'profile': profile,
    }
    return render(request, 'main/home.html', context)

def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk)
    related_projects = Project.objects.exclude(pk=pk)[:3]
    
    context = {
        'project': project,
        'related_projects': related_projects,
    }
    return render(request, 'main/project_detail.html', context)