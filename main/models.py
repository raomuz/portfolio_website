import datetime
from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    cv = models.FileField(upload_to='cv/')
    
    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=100)
    short_description = models.CharField(max_length=200, default="")  # ✅ string instead of 0
    full_description = models.TextField()
    technology = models.CharField(max_length=100)
    client = models.CharField(max_length=100, blank=True)
    date = models.DateField(default=datetime.date.today)  # ✅ already correct
    project_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    featured_image = models.ImageField(upload_to="project_images/", blank=True, null=True)  # ✅ fixed
    image_1 = models.ImageField(upload_to="project_images/", blank=True, null=True)
    image_2 = models.ImageField(upload_to="project_images/", blank=True, null=True)
    image_3 = models.ImageField(upload_to="project_images/", blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date']


class Skill(models.Model):
    name = models.CharField(max_length=50)
    proficiency = models.IntegerField(default=50)
    category = models.CharField(max_length=50, choices=[
        ('language', 'Programming Language'),
        ('framework', 'Framework'),
        ('tool', 'Tool'),
        ('other', 'Other')
    ])
    
    def __str__(self):
        return self.name

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.subject