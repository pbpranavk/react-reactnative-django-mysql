from django.db import models

# Create your models here.


class SimpleModel(models.Model):

    text = models.CharField(max_length=50)

    class Meta:
        verbose_name = "SimpleModel"
        verbose_name_plural = "SimpleModels"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("SimpleModel_detail", kwargs={"pk": self.pk})
