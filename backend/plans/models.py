from django.db import models


class Plan(models.Model):
    CATEGORY_CHOICES = [
        ('maison', 'Maison'),
        ('immeuble', 'Immeuble'),
        ('commerce', 'Commerce'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='maison')
    surface = models.CharField(max_length=80)
    rooms = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    image_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class PlanSubmission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('approved', 'Validé'),
        ('rejected', 'Rejeté'),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    description = models.TextField()
    file_url = models.URLField(blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.status}"


class CustomPlanRequest(models.Model):
    STYLE_CHOICES = [
        ('moderne', 'Moderne'),
        ('traditionnel', 'Traditionnel'),
        ('mixte', 'Mixte'),
    ]

    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=30)
    terrain_size = models.CharField(max_length=100)
    rooms = models.PositiveIntegerField()
    style = models.CharField(max_length=20, choices=STYLE_CHOICES, default='moderne')
    budget = models.CharField(max_length=100)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.style} - {self.budget}"
